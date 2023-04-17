<?php

namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface CRUDServiceInterface
{
    public function list(int $userId, bool $getAll = false);

    public function show(int $id): Model;

    public function create(array $data);

    public function update(Model $model, array $data);

    public function delete(Model $model);
}
