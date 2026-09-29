export class RandomData {

    static generateRandomString(length: number):string  {

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let randomString = "";
        for(let i=0;i<length;i++){
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];

        }
        return randomString;
         
    }
    static generateRandomEmail(length: number):string  {

         return this.generateRandomString(length) + "@gmail.com";
    }

}