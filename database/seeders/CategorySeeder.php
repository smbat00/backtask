<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    private $data = [
        [
            'name' => 'Car',
            'childs' => [
                [
                    'name' => 'BMW',
                    'childs' => [
                        [
                            'name' => 'E46',
                        ],
                        [
                            'name' => 'F10',
                        ],
                        [
                            'name' => 'E90',
                        ]
                    ],
                ],

                [
                    'name' => 'Mercedes',
                    'childs' => [
                        [
                            'name' => 'C-Class',
                            'childs' => [
                                [
                                    'name' => 'C180',
                                ],
                                [
                                    'name' => 'C300',
                                ],
                                [
                                    'name' => 'C63 AMG',
                                ],
                            ],
                        ],
                        [
                            'name' => 'E-Class',
                            'childs' => [
                                [
                                    'name' => 'E320',
                                ],
                                [
                                    'name' => 'C55 AMG',
                                ],
                                [
                                    'name' => 'E63 AMG Coupe',
                                ],
                            ],
                        ],
                        [
                            'name' => 'EQS'
                        ],
                        [
                            'name' => 'EQX'
                        ]
                    ],
                ]
            ],
        ],

        [
            'name' => 'Country',
            'childs' => [
                ['name' => 'Armenia'],
                ['name' => 'Spain'],
                ['name' => 'France'],
            ],
        ],
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->create($this->data, null);
    }

    private function create($data, $parentId)
    {
        foreach ($data as $row) {
            $category = Category::create([
                'name' => $row['name'],
                'parent_id' => $parentId,
            ]);

            if (array_key_exists('childs', $row)) {
                $this->create($row['childs'], $category->id);
            }
        }
    }
}
