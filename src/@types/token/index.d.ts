declare module "tokenTypes" {
    namespace tokenTypes {
        interface decoded {
            id: number;
            group: number;
            iat: number;
            exp: number;
        }

        interface verify {
            valid: boolean;
            decoded?: decoded;
            message?: string;
        }
    }
    export default tokenTypes;
}
