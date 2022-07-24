<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //マイページなどAPIから返却したユーザー情報を使って
        //画面に表示することはないので、idだけを返却する
        return [
            'id' => $this->id
        ];
    }
}

// APIからJSONを返却する際にはJSONの形式を明示的にするためにAPI Resourceを使う
