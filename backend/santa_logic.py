import pandas as pd
import random

def assign_secret_santa(employee_file, previous_year_file, output_file):
    """
    Reads employee data, assigns a unique Secret Santa to each employee, 
    and ensures that no employee gets the same secret child as last year.
    """
    # Read employee list
    employees = pd.read_csv(employee_file)

    # Read previous year data
    try:
        previous_pairs = pd.read_csv(previous_year_file)
    except FileNotFoundError:
        previous_pairs = pd.DataFrame(columns=["Employee_EmailID", "Secret_Child_EmailID"])

    # Extract required columns
    employee_list = employees[['Employee_Name', 'Employee_EmailID']].to_dict(orient='records')
    previous_mapping = dict(zip(previous_pairs['Employee_EmailID'], previous_pairs['Secret_Child_EmailID']))

    # Shuffle list for randomness
    random.shuffle(employee_list)

    # Assign secret child ensuring unique assignment
    assigned = {}
    available = set(e['Employee_EmailID'] for e in employee_list)

    for emp in employee_list:
        possible_choices = available - {emp['Employee_EmailID']} - {previous_mapping.get(emp['Employee_EmailID'], "")}

        if not possible_choices:
            return False  # Assignment failed, need reshuffling
        
        secret_child_email = random.choice(list(possible_choices))
        secret_child = next(e for e in employee_list if e['Employee_EmailID'] == secret_child_email)

        assigned[emp['Employee_EmailID']] = secret_child
        available.remove(secret_child_email)

    # Save the new assignment
    output_data = []
    for emp in employee_list:
        child = assigned[emp['Employee_EmailID']]
        output_data.append([emp['Employee_Name'], emp['Employee_EmailID'], child['Employee_Name'], child['Employee_EmailID']])

    pd.DataFrame(output_data, columns=['Employee_Name', 'Employee_EmailID', 'Secret_Child_Name', 'Secret_Child_EmailID']).to_csv(output_file, index=False)
    return True
