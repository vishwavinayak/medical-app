import json

# Load JSON data
with open("/Users/vishwavinayak/Desktop/Med_app/data/Substitute_medicines.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Open a file to save SQL commands
with open("substitutes.sql", "w", encoding="utf-8") as sql_file:
    sql_file.write("INSERT INTO substitute_medicines (id, name, price, manufacturer_name, short_composition1, short_composition2) VALUES\n")

    values = []
    for entry in data:
        id_value = entry.get("id", "NULL")
        name = entry.get("name", "").replace("'", "''")
        price = entry.get("price(₹)", "NULL").replace("₹", "").strip()
        manufacturer = entry.get("manufacturer_name", "").replace("'", "''")
        comp1 = entry.get("short_composition1", "").replace("'", "''")
        comp2 = entry.get("short_composition2", "").replace("'", "''")

        values.append(f"({id_value}, '{name}', {price if price else 'NULL'}, '{manufacturer}', '{comp1}', '{comp2}')")

    sql_file.write(",\n".join(values) + ";\n")

print("✅ SQL file 'substitutes.sql' created successfully!")
