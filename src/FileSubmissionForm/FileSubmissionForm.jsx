import { useState } from "react";

const FileSubmissionForm = () => {
  const [applications, setApplications] = useState([
    { id: Date.now(), name: "Application 1", documents: [] },
  ]);
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [tempFile, setTempFile] = useState(null);
  const addApplication = (name) => {
    setApplications([...applications, { id: Date.now(), name, documents: [] }]);
    setCurrentAppIndex(applications.length);
    closePopup();
  };

  const addDocument = () => {
    if (tempFile) {
      const updatedApplications = [...applications];
      updatedApplications[currentAppIndex].documents.push({
        id: Date.now(),
        file: tempFile,
      });
      setApplications(updatedApplications);
      closePopup();
    }
  };

  const removeDocument = (docId) => {
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex].documents = updatedApplications[
      currentAppIndex
    ].documents.filter((doc) => doc.id !== docId);
    setApplications(updatedApplications);
  };

  const handleFileChange = (e) => {
    setTempFile(e.target.files[0]);
  };

  const openPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setTempFile(null);
    setIsPopupOpen(false);
  };

  const resetForm = () => {
    setApplications([{ id: Date.now(), name: "Application 1", documents: [] }]);
    setCurrentAppIndex(0);
  };

  const handleSubmit = () => {
    console.log("Submitting applications:", applications);
    const fileNames = applications
      .map((app) => app.documents.map((doc) => doc.file.name))
      .flat();
    alert(`Submitted Files: ${fileNames.join(", ")}`);
  };

  const switchApplication = (index) => {
    setCurrentAppIndex(index);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Loan Wiser Assesment - File Submission Form
      </h1>
     
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {applications.map((app, index) => (
          <button
            key={app.id}
            onClick={() => switchApplication(index)}
            className={`px-4 py-2 rounded-lg ${
              index === currentAppIndex
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } transition-all duration-300`}
          >
            {app.name}
          </button>
        ))}
        <button
          onClick={() => openPopup("addApplication")}
          className="px-4 py-2 hover:text-green-600 border shadow-xl rounded-lg text-black transition-all duration-300"
        >
          + Add Application
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {applications[currentAppIndex].name}
        </h3>
        <div className="">
          {applications[currentAppIndex].documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 mb-2 bg-white border rounded-lg shadow-sm"
            >
              <span className="text-gray-800">{doc.file.name}</span>
              <button
                onClick={() => removeDocument(doc.id)}
                className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => openPopup("addDocument")}
            className="px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            + Add Document
          </button>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={resetForm}
          className="px-6 py-2 text-black border-1 shadow-xl hover:bg-red-500 rounded-lg transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-black border-1 rounded-lg hover:bg-green-600 shadow-xl transition-all duration-300"
        >
          Upload
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {popupType === "addDocument" ? "Add Document" : "Add Application"}
            </h3>

            {popupType === "addDocument" && (
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full mb-4 p-2 border rounded-lg"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addDocument}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
              </>
            )}

            {popupType === "addApplication" && (
              <>
                <input
                  type="text"
                  placeholder="Application Name"
                  className="w-full mb-4 p-2 border rounded-lg"
                  onChange={(e) => setTempFile({ name: e.target.value })}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addApplication(tempFile.name)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSubmissionForm;
