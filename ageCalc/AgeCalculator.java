import java.time.LocalDate;
import java.util.Scanner;

public class AgeCalculator {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your date of birth in YYYY-MM-DD: ");
        String inputDate = scanner.next();
        scanner.close();
        
        int birthYear = Integer.parseInt(inputDate.substring(0, 4));
        int birthMonth = Integer.parseInt(inputDate.substring(5, 7));
        int birthDay = Integer.parseInt(inputDate.substring(8, 10));
        
        LocalDate birthDate = LocalDate.of(birthYear, birthMonth, birthDay);
        LocalDate currentDate = LocalDate.now();
        
        int years = currentDate.getYear() - birthDate.getYear();
        int months = currentDate.getMonthValue() - birthDate.getMonthValue();
        int days = currentDate.getDayOfMonth() - birthDate.getDayOfMonth();
        
        if (days < 0) {
            months -= 1;
            days += birthDate.lengthOfMonth();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        
        System.out.println("Your Age: " + years + " Years " + months + " Months " + days + " Days");
    }
}
