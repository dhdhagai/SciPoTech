document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("riskCheckerForm");
    const resultDiv = document.getElementById("result");

    document.getElementById("calculateButton").addEventListener("click", function () {
        const age = parseInt(document.getElementById("age").value);
        const familyHistory = document.querySelector('input[name="familyHistory"]:checked').value;
        const BMI = parseFloat(document.getElementById("BMI").value);
        const exercise = parseFloat(document.getElementById("exercise").value);
        const diet = document.querySelector('input[name="diet"]:checked').value;

        // Simple risk calculation (for demonstration purposes)
        let risk = 0;

        if (age >= 40) {
            risk += 2;
        }

        if (familyHistory === "Yes") {
            risk += 3;
        }

        if (BMI >= 30) {
            risk += 5;
        }

        if (exercise < 3) {
            risk += 3;
        }

        if (diet === "NotHealthy") {
            risk += 4;
        }

        resultDiv.textContent = `Your diabetes risk score: ${risk}`;
    });
});
