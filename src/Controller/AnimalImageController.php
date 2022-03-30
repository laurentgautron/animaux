<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;

class AnimalImageController
{
    public function __invoke(Request $request)
    {
        $file = $request->files->get('file');
        dd($file);
    }
}