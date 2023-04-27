<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthTest extends TestCase
{
    public function test_register()
    {
        $email = time() . '@example.com';

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => $email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'device_name' => 'test'
        ]);


        $response = $this->postJson('/api/token', [
            'email' => $email,
            'password' => 'password',
            'device_name' => 'test'
        ]);
    }
}
