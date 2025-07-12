import json

# Load JSON data
with open("/Users/vishwavinayak/Desktop/Med_app/data/drug_interactions.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Open a file to save SQL commands
with open("interactions.sql", "w", encoding="utf-8") as sql_file:
    sql_file.write("INSERT INTO drug_interactions (drug1, drug2, interaction_description) VALUES\n")

    values = []
    for entry in data:
        drug1 = entry.get("Drug 1", "").replace("'", "''")
        drug2 = entry.get("Drug 2", "").replace("'", "''")
        description = entry.get("Interaction Description", "").replace("'", "''")

        values.append(f"('{drug1}', '{drug2}', '{description}')")

    sql_file.write(",\n".join(values) + ";\n")

print("✅ SQL file 'interactions.sql' created successfully!")
