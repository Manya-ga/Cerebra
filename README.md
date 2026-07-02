Cerebra

Voxel-Level Brain Tumor Segmentation Using 3D Deep Learning

Cerebra is a deep learning system for automated segmentation of brain tumors from multi-modal 3D MRI scans. It identifies and delineates distinct tumor sub-regions at the voxel level, with the goal of supporting radiologists in faster, more consistent diagnosis and treatment planning.

Built on a 3D U-Net architecture trained on the BraTS dataset, Cerebra combines a MONAI-based inference pipeline with a lightweight web interface for uploading scans and reviewing segmentation results.


Overview

Manual segmentation of brain tumors from MRI is time-consuming and subject to inter-observer variability. Cerebra automates this process by processing four MRI modalities in parallel — T1, T1CE, T2, and FLAIR — and producing a segmentation mask that separates tumor tissue into clinically relevant sub-regions.

Core capabilities:


Automated 3D segmentation of brain tumors from multi-modal MRI input
Voxel-level prediction across three tumor sub-regions (whole tumor, tumor core, enhancing tumor)
Web-based upload and inference pipeline with result visualization
Model built on a 3D U-Net architecture using the MONAI framework



Tech Stack

LayerTechnologiesFrontendReact, Vite, Tailwind CSSBackendFastAPI, PythonDeep LearningPyTorch, MONAIImaging & PreprocessingNiBabel, SimpleITK, NumPy, OpenCVVisualizationMatplotlib, Plotly


Dataset

Cerebra is trained on the BraTS (Brain Tumor Segmentation Challenge) dataset, which provides skull-stripped, co-registered MRI volumes across four modalities:


T1 — native
T1CE — contrast-enhanced
T2 — T2-weighted
FLAIR — fluid-attenuated inversion recovery


Ground-truth annotations label three tumor tissue classes:


NCR — Necrotic core
ED — Peritumoral edema
ET — Enhancing tumor


These are combined at inference time into the three clinically standard evaluation regions: Whole Tumor (WT), Tumor Core (TC), and Enhancing Tumor (ET).


Project Structure

Cerebra/
├── frontend/           # React + Vite client
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/             # FastAPI inference server
│   ├── app/
│   ├── models/
│   ├── inference/
│   ├── uploads/
│   ├── outputs/
│   ├── requirements.txt
│   └── main.py
│
├── datasets/            # BraTS data (not tracked in version control)
├── trained_models/      # Saved model checkpoints
└── README.md


Getting Started

Prerequisites


Python 3.9+
Node.js 18+
(Recommended) CUDA-capable GPU for inference


1. Clone the repository

bashgit clone https://github.com/Manya-ga/Cerebra.git
cd Cerebra

2. Backend setup

bashcd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload

3. Frontend setup

bashcd frontend
npm install
npm run dev

The frontend will be available at http://localhost:5173, and the backend API at http://localhost:8000.


How It Works


Upload — User submits multi-modal MRI volumes (T1, T1CE, T2, FLAIR) through the web interface.
Preprocess — Volumes are normalized, resampled, and co-registered.
Inference — The trained 3D U-Net model processes the volumes and predicts a segmentation mask.
Post-process — Predictions are mapped to WT, TC, and ET regions.
Visualize — Segmentation results are rendered as overlays across axial, sagittal, and coronal slices.
Export — Users can download the segmentation mask and summary statistics.



Model Output

For each scan, Cerebra generates:


A voxel-wise segmentation mask (NIfTI format)
Slice-by-slice visualization overlays
Per-region volume statistics (in mm³ and voxel count)
Model confidence scores per region



Applications


Clinical decision support for radiology teams
Pre-surgical treatment planning
Longitudinal tumor tracking in research settings
Educational tool for medical imaging and oncology training



Roadmap


 DICOM input support (in addition to NIfTI)
 Interactive 3D volume rendering
 Multi-model comparison and ensembling
 Explainable AI overlays (attention/saliency maps)
 Cloud-hosted inference endpoint
 Doctor dashboard with patient/case management



Author

Manya G A
Information Science & Engineering, Cambridge Institute of Technology


GitHub: github.com/Manya-ga
LinkedIn: linkedin.com/in/manya-g-a-8912182a0



License

This project is licensed under the MIT License. See LICENSE for details.

If you find this project useful, consider starring the repository.
