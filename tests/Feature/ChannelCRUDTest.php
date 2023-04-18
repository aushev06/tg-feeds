<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChannelCRUDTest extends TestCase
{
//    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_crud_channel(): void
    {
        /**
         * @var \App\Models\Folder $folder
         */
        $folder = Folder::factory()->create();


        $response = $this
            ->actingAs($folder->user)
            ->postJson('/api/channels', [
                'name' => 'TestChannel',
                'url' => 'https://rsshub.app/telegram/channel/nemorgenshtern',
                'folder_id' => $folder->id,

            ]);


        $response->assertStatus(201);

        $id = $response->json('id');

        $this->assertDatabaseHas('channels', [
            'url' => 'https://rsshub.app/telegram/channel/nemorgenshtern',
        ]);

        $this->assertDatabaseHas('channel_user', [
            'user_id' => $folder->user->id,
            'folder_id' => $folder->id,
            'channel_id' => $id,
        ]);


//
//        // Другой не может редактировать папку
//        $response = $this
//            ->actingAs($secondUser)
//            ->putJson('/api/folders/' . $id, [
//                'name' => 'TestFolderUpdated',
//            ])
//            ->assertForbidden();
//
//        // Редактирование папки
//
//        $response = $this
//            ->actingAs($user)
//            ->putJson('/api/folders/' . $id, [
//                'name' => 'TestFolderUpdated',
//            ])
//            ->assertOk();
//
//        // Просмотр папки
//        $response = $this
//            ->actingAs($user)
//            ->getJson('/api/folders/' . $id,)
//            ->assertOk();
//
//        // Просмотр папок
//        $response = $this
//            ->actingAs($user)
//            ->getJson('/api/folders/')
//            ->assertOk();
//
//        // Удаление папки
//        $response = $this
//            ->actingAs($secondUser)
//            ->deleteJson('/api/folders/' . $id)
//            ->assertForbidden();
//
//        $response = $this
//            ->actingAs($user)
//            ->deleteJson('/api/folders/' . $id)
//            ->assertNoContent();
    }

}
