#include<stdio.h>

int main()
{
	char str[100];
	printf("Enter a string: ");
	fgets(str, sizeof(str), stdin);
	
	FILE *file = fopen("output.txt", "w");
	fprintf(file, "You entered: %s", str);
	fclose(file);
	return 0;
}