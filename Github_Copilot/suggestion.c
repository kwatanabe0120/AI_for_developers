#include <stdio.h>
#include <ctype.h> // Include ctype.h for tolower function

// Function to convert temperature from Fahrenheit to Celsius and vice versa
// Takes temperature value and unit ('F' or 'C') as input
// Returns converted temperature or -1 if an invalid unit is entered
double convert_temperature(const double temp, const char unit) {
    if (unit == 'F') {
        return (temp - 32) * 5 / 9; // Convert Fahrenheit to Celsius
    } else if (unit == 'C') {
        return (temp * 9 / 5) + 32; // Convert Celsius to Fahrenheit
    } else {
        return -1; // Return error code for invalid unit
    }
}

int main() {
    // Prompt user for temperature input
    double temp;
    printf("Enter temperature: ");
    if (scanf("%lf", &temp) != 1) { // Validate temperature input
        printf("Error: Invalid temperature entered.\n");
        return 1;
    }

    // Prompt user for unit input
    char unit;
    printf("Enter unit C or F: ");
    if (scanf(" %c", &unit) != 1) { // Validate unit input
        printf("Error: Invalid unit entered.\n");
        return 1;
    }
    unit = tolower(unit); // Convert unit to lowercase for case-insensitive comparison

    // Convert temperature
    double result = convert_temperature(temp, unit);
    if (result == -1) {
        printf("Error: Invalid unit entered. Please enter 'C' for Celsius or 'F' for Fahrenheit.\n");
    } else {
        printf("After conversion: %.2lf\n", result); // Print converted temperature
    }
    return 0;
}