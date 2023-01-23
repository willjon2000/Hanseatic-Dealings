<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function register(Request $request)
    {
        return User::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password'))
        ]);

    }

    /**
     * @param Request $request
     * @return
     */
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('username','password'))){
            return response([
                'message' => 'invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        return response([
            'token' => $token
        ],Response::HTTP_OK);
    }
}
