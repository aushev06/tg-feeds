<?php


namespace App\Http\Controllers\SocialAuth;


use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function callbackVK(Request $request)
    {
        $user = $this->getOrSaveUser('vkontakte');

        Auth::login($user);

        return redirect()->to(
            session('redirect_to') ? session('redirect_to') . 'auth?token=' . $user->createToken(
                    'auth_token'
                )->plainTextToken : config('app.frontend_url') . '/auth?token=' . $user->createToken(
                    'auth_token'
                )->plainTextToken
        );
    }

    public function facebook()
    {
        $responseUser = Socialite::driver('vkontakte')->user();
        $user = User::where('email', $responseUser->accessTokenResponseBody['email'])->first();
    }

    public function callbackGoogle(Request $request): \Illuminate\Http\RedirectResponse
    {
        $user = $this->getOrSaveUser('google');

        return redirect()->to(
            session('redirect_to') ? session('redirect_to') . 'auth?token=' . $user->createToken(
                    'auth_token'
                )->plainTextToken : config('app.frontend_url') . '/auth?token=' . $user->createToken(
                    'auth_token'
                )->plainTextToken
        );
    }

    private function getOrSaveUser(string $driver)
    {
        $responseUser = Socialite::driver($driver)->user();

        /**
         * @var User $user
         */
        $user = User::query()
            ->where('social_id', $responseUser->getId())
            ->orWhere('email', $responseUser->getEmail())
            ->first();

        if ($user !== null) {
            return User::createIfNotExistAndAuth($user);
        }

        $newUser = [
            'name' => $responseUser->getName(),
            'avatar' => $responseUser->getAvatar(),
            'country' => $responseUser->user['country'] ?? '',
            'email' => $responseUser->email ?? '',
            'social_id' => $responseUser->getId(),
            'password' => Hash::make(rand(0, 1000)),
        ];

        return $user = User::createIfNotExistAndAuth(userFields: $newUser);
    }
}
