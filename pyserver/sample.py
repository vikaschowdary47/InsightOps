import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from joblib import dump

# Fake system data
data = {
    "cpu": [10, 30, 50, 70, 90, 95],
    "memory": [20, 40, 60, 80, 90, 95],
    "risk": ["low", "low", "medium", "medium", "high", "high"]
}
df = pd.DataFrame(data)

# Train simple model
X = df[["cpu", "memory"]]
y = df["risk"]
model = DecisionTreeClassifier()
model.fit(X, y)

# Save model
dump(model, "system_load_model.joblib")
print("✅ Model trained and saved!")
