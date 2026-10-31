export interface LoginDataRecord {
    scenario: string;
    Email: string;
    Password: string;
    expectedResult: "Pass" | "Fail";
}

export const Logindata: LoginDataRecord[] = [
    {
        scenario: "Valid credentials",
        Email: "123#123@gmail.com",
        Password: "123456#123",
        expectedResult: "Pass"
    },
    {
        scenario: "Invalid credentials",
        Email: "456#456@gmail.com",
        Password: "456789#456",
        expectedResult: "Fail"
    },
    {
        scenario: "Empty credentials",
        Email: "",
        Password: "",
        expectedResult: "Fail"
    }
];
