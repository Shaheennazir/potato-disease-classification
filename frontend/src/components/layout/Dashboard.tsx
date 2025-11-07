import { useState, useEffect, useCallback } from 'react';
import { Dropzone } from '../ui/Dropzone';
import { predictImage } from '../../lib/api';
import { PredictionResponse } from '../../types';
import { RecentScans } from './RecentScans';

export const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentScans, setRecentScans] = useState<PredictionResponse[]>([]);

  const sendFile = useCallback(async () => {
    if (selectedFile) {
      setIsLoading(true);
      
      try {
        const response = await predictImage(selectedFile);
        setData(response);
        // Add to recent scans
        setRecentScans(prev => [response, ...prev.slice(0, 2)]);
      } catch (error) {
        console.error("Upload failed:", error);
        setData({ class: "Error", confidence: 0 });
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedFile]);

  const clearData = useCallback(() => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
  }, []);

  const onSelectFile = useCallback((file: File) => {
    setSelectedFile(file);
    setData(null);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    sendFile();
  }, [preview, sendFile]);

  const confidence = data ? (data.confidence * 100).toFixed(0) : 0;

  return (
    <main className="w-full max-w-7xl flex-1 flex flex-col items-center py-10 md:py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* PageHeading */}
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tighter">Potato Disease Identifier</h1>
          <p className="text-white/60 text-base font-normal leading-normal">Upload an image of a potato leaf to classify its disease.</p>
        </div>

        {/* Upload Area */}
        <div className="flex flex-col bg-[#2B2B2B] p-4 rounded-xl border border-white/10">
          <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-white/20 hover:border-primary transition-colors px-6 py-14">
            <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: "36px" }}>upload_file</span>
            </div>
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Drag & Drop an image here</p>
              <p className="text-white/60 text-sm font-normal leading-normal text-center">or click the button below to browse your files</p>
            </div>
            <Dropzone onFileSelect={onSelectFile} />
          </div>
        </div>

        {/* Analysis Result Section */}
        {data && (
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">Analysis Result</h2>
            <div className="bg-[#2B2B2B] rounded-xl border border-white/10 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Preview */}
                <div className="w-full aspect-square rounded-lg bg-black/20 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src={preview || ''} 
                    alt="Uploaded potato leaf" 
                  />
                </div>
                
                {/* Result Details */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-primary font-medium">DISEASE DETECTED</p>
                    <h3 className="text-white tracking-tight text-[32px] font-bold leading-tight">{data.class}</h3>
                  </div>
                  
                  {/* Confidence Score */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-white/80 font-medium">Confidence Score</p>
                      <p className="text-sm text-white font-bold">{confidence}%</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${confidence}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/60 text-base font-normal leading-relaxed">
                    {data.class === 'Early Blight' && 'Early blight is a fungal disease that primarily affects potato and tomato plants, characterized by small, dark lesions on lower leaves.'}
                    {data.class === 'Late Blight' && 'Late blight is a serious fungal disease that can destroy entire potato crops, characterized by water-soaked lesions that turn brown and papery.'}
                    {data.class === 'Healthy' && 'The potato leaf appears healthy with no signs of disease. Continue good agricultural practices to maintain plant health.'}
                    {data.class === 'Error' && 'Unable to process the image. Please try again with a clear image of a potato leaf.'}
                  </p>
                  
                  {/* Action Button */}
                  <button className="flex mt-2 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-5 bg-primary text-[#1A1A1A] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                    <span className="truncate">View Recommendations</span>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Scans Section */}
        {recentScans.length > 0 && (
          <RecentScans scans={recentScans} />
        )}
      </div>
    </main>
  );
};