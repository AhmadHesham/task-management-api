export interface SignInDto {
	email: string;
	password: string;
}

export interface JwtResponse {
	access_token: string;
}
