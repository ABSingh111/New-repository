Here’s a README file for your project with clear setup and run instructions:  

---

# **Secret Santa Web App**  

This is a full-stack web application for managing a **Secret Santa game**, allowing users to **upload CSV files** and **download the generated Secret Santa list**.  

## **🚀 Features**  
- Upload Employee & Previous Year CSV Files  
- Process & Generate Secret Santa Pairs  
- Download the Generated Secret Santa List  
- Error Handling for API Requests  

---

## **📌 Tech Stack**  
- **Frontend:** React.js (Axios for API calls)  
- **Backend:** Flask (Python)  
- **Storage:** CSV file handling  

---

## **🛠 Prerequisites**  
Before running the project, ensure you have the following installed:  
- **Node.js** (for React frontend) → [Download](https://nodejs.org/)  
- **Python 3.x** (for Flask backend) → [Download](https://www.python.org/)  

---

## **⚙️ Setup Instructions**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/ABSingh111/Secret-Santa-Game-Web-App.git
cd secret-santa
```

---

## **📌 Backend Setup (Flask API)**  

### **2️⃣ Create a Virtual Environment**  
```sh
cd backend
python -m venv venv
source venv/bin/activate  # (Mac/Linux)
venv\Scripts\activate      # (Windows)
```

### **3️⃣ Install Required Python Packages**  
```sh
pip install -r requirements.txt
```

### **4️⃣ Run the Flask Server**  
```sh
python app.py
```
The Flask server will start at **`http://127.0.0.1:5000`**  

---

## **📌 Frontend Setup (React App)**  

### **5️⃣ Install React Dependencies**  
```sh
cd frontend
npm install
```

### **6️⃣ Start the React Application**  
```sh
npm start
```
The frontend will run on **`http://localhost:3000`**  

---

## **🖥 Usage Instructions**  

1. Open **`http://localhost:3000`** in your browser.  
2. Upload the Employee CSV & Previous Year CSV files.  
3. Once uploaded, the **Download Secret Santa List** button will appear.  
4. Click **Download** to get the generated CSV file.  

---

## **📌 API Endpoints (Flask Backend)**  

| **Method** | **Endpoint**      | **Description**                        |
|------------|------------------|----------------------------------------|
| `POST`     | `/upload`        | Upload CSV files                      |
| `GET`      | `/download`      | Download Secret Santa CSV File        |

---

## **⚠️ Troubleshooting**  

### **🔴 Common Issues & Fixes**  

| **Issue**                                    | **Possible Fix**                                         |
|----------------------------------------------|---------------------------------------------------------|
| `Network Error! Please check Flask server`  | Ensure Flask backend is running (`python app.py`)      |
| `CORS policy issue`                          | Add `withCredentials: true` in Axios requests         |
| `File not downloading`                      | Check Flask `/download` route & confirm file exists   |
| `setMessage is not a function`              | Ensure `setMessage` is passed correctly in props      |

---

## **📌 Project Structure**  
```
secret-santa/
│── backend/  
│   ├── app.py               # Flask Backend  
│   ├── requirements.txt      # Python Dependencies  
│   └── data/                 # Uploaded & Processed Files  
│  
│── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   │   ├── UploadForm.js   # File Upload Component  
│   │   │   ├── DownloadButton.js  # File Download Component  
│   │   ├── App.js           # Main React App  
│   ├── package.json        # React Dependencies  
│  
│── README.md               # Project Setup & Instructions  
```

---

## **👨‍💻 Contributors**  
- **Anosh Singh** | [GitHub Profile](https://github.com/ABSingh111)  