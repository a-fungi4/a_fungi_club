import React from "react";
import NavItem from "@/components/NavItem";
import ArtIcon from "@/components/icons/ArtIcon";
import AboutIcon from "@/components/icons/AboutIcon";

export default function ComponentGallery() {
  return (
    <main className="p-8 bg-background min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Component Gallery</h1>
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">NavItem</h2>
          <div className="flex gap-4">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Default</span>
              <NavItem label="Item" icon={<ArtIcon />} />
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Selected/Hover</span>
              <NavItem label="Item" icon={<AboutIcon />} selected />
            </div>
          </div>
        </div>
      </section>
      {/* Test color blocks */}
      <div className="w-32 h-12 bg-primary text-white flex items-center justify-center mb-2">Primary</div>
      <div className="w-32 h-12 bg-secondary text-white flex items-center justify-center mb-2">Secondary</div>
      <div className="w-32 h-12 bg-teritiary text-white flex items-center justify-center mb-2">Teritiary</div>
      <div className="w-32 h-12 bg-background text-white flex items-center justify-center mb-2">Background</div>
      <div className="w-32 h-12 bg-black text-white flex items-center justify-center mb-2">Black</div>
      <div className="w-32 h-12 bg-white text-black flex items-center justify-center mb-2">White</div>
    </main>
  );
} 