export interface JwtServiceInterface {
    sign(payload: Record<string, unknown>): string;
}
