import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

const UploadSection = ({ onSubmit, isProcessing }) => {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accepted files:", acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxFiles: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!description && !selectedImage) {
      alert("Please provide a description or upload an image.");
      return;
    }
    console.log("Submitting to handleAnalysis:", { text: description, image: selectedImage ? "Yes" : "No" });
    onSubmit(selectedImage, description); // Call handleAnalysis with image and text
  };

  return (
    <section id="upload-section" className="upload-section bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upload Image & Enter Description</h2>

        <div className="max-w-2xl mx-auto">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
            ) : (
              <div>
                <FiUpload className="mx-auto text-4xl mb-2 text-gray-400" />
                <p className="text-gray-600">Drag & drop an image, or click to select one.</p>
                <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter a description of the mood or theme..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isProcessing ? "Processing..." : "Generate Music"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
