import { useState } from "react";

const FileSubmissionForm = () => {
  const [applications, setApplications] = useState([
    {
      id: Date.now(),
      name: "Application 1",
      subTabs: [{ id: Date.now() + 1, name: "Sub-tab 1", documents: [] }],
    },
  ]);
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  const [currentSubTabIndex, setCurrentSubTabIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [tempData, setTempData] = useState("");

  const addApplication = (name) => {
    const newApplication = {
      id: Date.now(),
      name,
      subTabs: [{ id: Date.now() + 1, name: "Sub-tab 1", documents: [] }],
    };
    setApplications([...applications, newApplication]);
    setCurrentAppIndex(applications.length); 
    setCurrentSubTabIndex(0);
    closePopup();
  };

  const addSubTab = (name) => {
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex].subTabs.push({
      id: Date.now(),
      name,
      documents: [],
    });
    setApplications(updatedApplications);
    setCurrentSubTabIndex(
      updatedApplications[currentAppIndex].subTabs.length - 1
    ); 
    closePopup();
  };

  const addDocument = (file) => {
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex].subTabs[
      currentSubTabIndex
    ].documents.push({
      id: Date.now(),
      file,
    });
    setApplications(updatedApplications);
    closePopup();
  };

  const removeDocument = (docId) => {
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex].subTabs[currentSubTabIndex].documents =
      updatedApplications[currentAppIndex].subTabs[
        currentSubTabIndex
      ].documents.filter((doc) => doc.id !== docId);
    setApplications(updatedApplications);
  };

  const handleFileChange = (e) => {
    setTempData(e.target.files[0]);
  };

  const openPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setTempData("");
    setIsPopupOpen(false);
  };

  const resetForm = () => {
    setApplications([
      {
        id: Date.now(),
        name: "Application 1",
        subTabs: [{ id: Date.now() + 1, name: "Sub-tab 1", documents: [] }],
      },
    ]);
    setCurrentAppIndex(0);
    setCurrentSubTabIndex(0);
  };

  const handleSubmit = () => {
    console.log("Submitting applications:", applications);
    const fileNames = applications
      .flatMap((app) =>
        app.subTabs.flatMap((subTab) =>
          subTab.documents.map((doc) => doc.file.name)
        )
      )
      .join(", ");
    alert(`Submitted Files: ${fileNames}`);
  };

  const switchApplication = (index) => {
    setCurrentAppIndex(index);
    setCurrentSubTabIndex(0);
  };

  const switchSubTab = (index) => {
    setCurrentSubTabIndex(index);
  };

  const goToPreviousApplication = () => {
    if (currentAppIndex > 0) {
      setCurrentAppIndex(currentAppIndex - 1);
      setCurrentSubTabIndex(0);
    }
  };

  const goToNextApplication = () => {
    if (currentAppIndex < applications.length - 1) {
      setCurrentAppIndex(currentAppIndex + 1);
      setCurrentSubTabIndex(0);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Loan Wiser Assessment - File Submission Form
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

      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {applications[currentAppIndex].subTabs.map((subTab, index) => (
          <button
            key={subTab.id}
            onClick={() => switchSubTab(index)}
            className={`px-4 py-2 rounded-lg ${
              index === currentSubTabIndex
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            } transition-all duration-300`}
          >
            {subTab.name}
          </button>
        ))}
        <button
          onClick={() => openPopup("addSubTab")}
          className="px-4 py-2 hover:text-blue-600 border shadow-xl rounded-lg text-black transition-all duration-300"
        >
          + Add Sub-tab
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {applications[currentAppIndex]?.subTabs[currentSubTabIndex]?.name ||
            "No Sub-tab Selected"}
        </h3>

        <div className="">
          {applications[currentAppIndex].subTabs[
            currentSubTabIndex
          ].documents.map((doc) => (
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
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {popupType === "addDocument"
                ? "Add Document"
                : popupType === "addApplication"
                ? "Add Application"
                : "Add Sub-tab"}
            </h3>
            {popupType === "addDocument" && (
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full mb-4 p-2 border rounded-lg"
              />
            )}
            {(popupType === "addApplication" || popupType === "addSubTab") && (
              <input
                type="text"
                placeholder={
                  popupType === "addApplication"
                    ? "Application Name"
                    : "Sub-tab Name"
                }
                className="w-full mb-4 p-2 border rounded-lg"
                onChange={(e) => setTempData(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  popupType === "addDocument"
                    ? addDocument(tempData)
                    : popupType === "addApplication"
                    ? addApplication(tempData)
                    : addSubTab(tempData)
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center space-x-4 mt-6">
        <button
          onClick={goToPreviousApplication}
          disabled={currentAppIndex === 0}
          className={`px-6 py-2 text-black border rounded-lg shadow-xl transition-all duration-300 ${
            currentAppIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500"
          }`}
        >
          Previous
        </button>

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

        <button
          onClick={goToNextApplication}
          disabled={currentAppIndex === applications.length - 1}
          className={`px-6 py-2 text-black border rounded-lg shadow-xl transition-all duration-300 ${
            currentAppIndex === applications.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileSubmissionForm;
