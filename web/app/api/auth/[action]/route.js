// app/api/auth/[action]/route.js
import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

export async function POST(request, { params }) {
    const { action } = params;
    const { email, password } = await request.json();

    try {
        switch (action) {
            case 'login':
                const loginCommand = new InitiateAuthCommand({
                    AuthFlow: "USER_PASSWORD_AUTH",
                    ClientId: process.env.COGNITO_CLIENT_ID,
                    AuthParameters: {
                        USERNAME: email,
                        PASSWORD: password,
                    },
                });
                const loginResponse = await client.send(loginCommand);
                return NextResponse.json({ message: 'Login successful', token: loginResponse.AuthenticationResult.IdToken });

            case 'signup':
                const signUpCommand = new SignUpCommand({
                    ClientId: process.env.COGNITO_CLIENT_ID,
                    Username: email,
                    Password: password,
                    UserAttributes: [
                        {
                            Name: "email",
                            Value: email,
                        },
                    ],
                });
                await client.send(signUpCommand);
                return NextResponse.json({ message: 'Signup successful. Please check your email for verification.' });

            default:
                return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}