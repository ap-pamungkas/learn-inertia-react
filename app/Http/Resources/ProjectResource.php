<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

use App\Http\Resources\UserResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "created_at" => (new Carbon($this->created_at))->format("d-m-Y"),
            "due_date" => (new Carbon($this->due_date))->format("d-m-Y"),
            "image_path"=> $this->image_path,
            'status' => $this->status,
            "created_by" =>new UserResource($this->createdBy),
            "updated_by" =>  new UserResource($this->updatedBy),
          

        ];
    }
}
