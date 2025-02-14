from flask import Flask, request, jsonify, send_file
import os
from santa_logic import assign_secret_santa
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
CORS(app)

# Define the folder for file uploads
UPLOAD_FOLDER = "data"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create folder if it doesn't exist

# Route to handle file uploads for employees and previous year CSV files
@app.route('/upload', methods=['POST'])
def upload_files():
    try:
        # Check if both CSV files are provided in the request
        if 'employee_file' not in request.files or 'previous_year_file' not in request.files:
            return jsonify({"error": "Both CSV files are required!"}), 400

        # Retrieve the uploaded files
        emp_file = request.files['employee_file']
        prev_file = request.files['previous_year_file']

        # Define paths where the uploaded files will be saved
        emp_path = os.path.join(UPLOAD_FOLDER, "employees.csv")
        prev_path = os.path.join(UPLOAD_FOLDER, "previous_year.csv")
        output_path = os.path.join(UPLOAD_FOLDER, "secret_santa_output.csv")

        print("[DEBUG] Saving uploaded files...")  # Debug: Saving files to disk
        emp_file.save(emp_path)
        prev_file.save(prev_path)

        print("[DEBUG] Running Secret Santa Algorithm...")  # Debug: Running the Secret Santa algorithm
        # Run the Secret Santa algorithm using the uploaded files
        success = assign_secret_santa(emp_path, prev_path, output_path)

        # Check if the Secret Santa assignment was successful
        if not success:
            return jsonify({"error": "Secret Santa assignment failed. Check file format and try again."}), 500

        print("[DEBUG] Successfully assigned Secret Santa!")  # Debug: Success message
        return jsonify({"message": "Secret Santa assigned successfully!"}), 200

    except Exception as e:
        print("[ERROR]", str(e))  # Debug: Log error if something goes wrong
        return jsonify({"error": f"Server Error: {str(e)}"}), 500

# Route to handle downloading the output CSV file
@app.route("/download", methods=["GET"])
def download_file():
    file_path = "data/secret_santa_output.csv"

    # Check if the output file exists
    if os.path.exists(file_path):
        # If it exists, send the file as a download
        return send_file(file_path, as_attachment=True)
    else:
        # If the file doesn't exist, return an error message
        return jsonify({"error": "File not found!"}), 404

# Run the Flask app in debug mode
if __name__ == '__main__':
    app.run(debug=True)
