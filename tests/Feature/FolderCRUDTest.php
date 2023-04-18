<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FolderCRUDTest extends TestCase
{
//    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_crud_folder(): void
    {
        $user = User::factory()->create();



        $secondUser = User::factory()->create();



        $response = $this
            ->actingAs($user)
            ->postJson('/api/folders', [
                'name' => 'TestFolder',
            ]);

        $response->assertStatus(201);

        $id = $response->json('id');

        $this->assertDatabaseHas('folders', [
            'user_id' => $user->id,
            'name' => 'TestFolder',
        ]);


        // Другой не может редактировать папку
        $response = $this
            ->actingAs($secondUser)
            ->putJson('/api/folders/' . $id, [
                'name' => 'TestFolderUpdated',
            ])
            ->assertForbidden();

        // Редактирование папки

        $response = $this
            ->actingAs($user)
            ->putJson('/api/folders/' . $id, [
                'name' => 'TestFolderUpdated',
            ])
            ->assertOk();

        // Просмотр папки
        $response = $this
            ->actingAs($user)
            ->getJson('/api/folders/' . $id,)
            ->assertOk();

        // Просмотр папок
        $response = $this
            ->actingAs($user)
            ->getJson('/api/folders/')
            ->assertOk();

        // Удаление папки
        $response = $this
            ->actingAs($secondUser)
            ->deleteJson('/api/folders/' . $id)
            ->assertForbidden();

        $response = $this
            ->actingAs($user)
            ->deleteJson('/api/folders/' . $id)
            ->assertNoContent();
    }

}
