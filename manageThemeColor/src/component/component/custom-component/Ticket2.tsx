import React from 'react';
import Image from 'next/image';
import { Settings } from 'lucide-react';

interface Ticket2Props {
  protocolNumber?: string | number;
  price?: number;
  title?: string;
  category?: string;
  dateRange?: string;
  imageSrc?: string;
  leftStripText?: string;
  rightStripText?: string;
  bottomText?: string;
  className?: string;
}

export default function Ticket2({
  protocolNumber = 101,
  price = 15,
  title = "Switching Protocol",
  category = "information",
  dateRange = "01-Jan-2026 -- 01-Jan-2026",
  imageSrc,
  leftStripText = "101 •|||• Switching",
  rightStripText = "100 •|||• for admin",
  bottomText = "#HTTP status code >>> 101 >> switching protocol << FULL TICKET >>",
  className = "",
}: Ticket2Props) {
  return (
    <div className={`relative w-[477px] h-[181px] overflow-hidden drop-shadow-lg select-none font-sans ${className}`}>
      {/* Background SVG for the shape */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 477 181"
        fill="none"
      >
        {/* Left Purple Strip */}
        <path fill="#876AA4" d="M0 15C0 6.716 6.716 0 15 0h2v181h-2c-8.284 0-15-6.716-15-15z" />
        {/* Main Pink Body with Cutouts */}
        <path fill="#F875AA" d="M460 181h-85.011q.01-.25.011-.5c0-7.456-6.044-13.5-13.5-13.5s-13.5 6.044-13.5 13.5q.001.25.011.5H17V0h331.011c.263 7.224 6.201 13 13.489 13s13.226-5.776 13.489-13H460z" />
        {/* Right Purple Strip */}
        <path fill="#876AA4" d="M477 166c0 8.284-6.716 15-15 15h-2V0h2c8.284 0 15 6.716 15 15z" />
        {/* Perforated Line */}
        <line x1="361.5" y1="15.5" x2="361.5" y2="166.5" stroke="#5A5555" strokeOpacity="0.27" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 5 2 5" />
      </svg>

      {/* Top Date Range */}
      <div className="absolute top-[10px] left-[32px] text-white/80 text-[10px] font-mono tracking-widest uppercase z-10">
        {dateRange}
      </div>

      {/* Left Purple Strip Content */}
      <div className="absolute left-[-50px] top-[60px] w-[117px] -rotate-90 flex items-center justify-center z-10">
        <span className="text-white text-[8px] font-mono tracking-widest">{leftStripText}</span>
      </div>

      {/* Right Purple Strip Content */}
      <div className="absolute right-[5px] top-[14px] flex flex-col gap-[6px] z-10">
        <div className="w-[6px] h-[6px] rounded-full bg-[#E0FFDD]" />
        <div className="w-[6px] h-[6px] rounded-full bg-[#FFFAA3]" />
        <div className="w-[6px] h-[6px] rounded-full bg-[#FED2E2]" />
      </div>
      <div className="absolute right-[-50px] bottom-[60px] w-[117px] -rotate-90 flex items-center justify-center z-10">
        <span className="text-white text-[8px] font-mono tracking-widest">{rightStripText}</span>
      </div>

      {/* Image Placeholder */}
      <div className="absolute left-[30px] top-[30px] w-[120px] h-[120px] bg-[#F7FFF6] rounded-[23px] overflow-hidden z-10 shadow-sm border border-white/50">
        {imageSrc ? (
          <Image src={imageSrc} alt="ticket image" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-200/50" />
        )}
      </div>

      {/* Price Tag Circle */}
      <div 
        className="absolute flex items-center justify-center rounded-full z-20 shadow-md left-[119px] top-[115px] w-[42px] h-[42px]"
        style={{
          background: "conic-gradient(from 90deg,#fed2e2 0deg,#fffaa2 173.095deg,#bbfbff 360deg)"
        }}
      >
        <div className="w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center text-[#5A5555] font-black text-sm pb-[1px] tracking-tighter">
          ${price}
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-[28px] left-[179px] w-[120px] h-[23px] rounded-full bg-[#E5E5EA] border border-[#AC83A8] flex items-center justify-center gap-1.5 z-10">
        <div className="w-[5px] h-[5px] rounded-full bg-[#AC83A8]" />
        <span className="text-[#AC83A8] text-[11px] font-mono tracking-widest uppercase mt-[1px]">{category}</span>
      </div>

      {/* Big Number */}
      <div className="absolute left-[186px] top-[38px] text-[75px] font-black text-black tracking-widest z-10 drop-shadow-sm jetbrains-mono-bold">
        {protocolNumber}
      </div>

      {/* Sub Title */}
      <div className="absolute left-[180px] top-[135px] text-white font-mono text-[13px] tracking-widest z-10 flex items-center gap-2 drop-shadow-sm">
        {title}
      </div>

      {/* Right Ticket Stub section */}
      <div className="absolute right-[28px] top-[20px] w-[70px] h-[141px] bg-[#EDFFF0] rounded-[10px] flex flex-col items-center justify-between z-10 shadow-sm border border-white/50">
        <span className="text-[#F875AA] text-[9px] font-mono tracking-widest rotate-180 uppercase" >Switching</span>
       
        <span className="text-[#F875AA] text-[40px] font-mono font-black -rotate-90">
            {protocolNumber}
        </span>
       
        <span className="text-[#F875AA] text-[9px] font-mono tracking-widest rotate-180 uppercase" >Switching</span>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-[6px] left-[30px] w-[417px] text-left text-white/90 text-[7px] font-mono tracking-widest uppercase z-10">
        {bottomText}
      </div>
    </div>
  );
}
