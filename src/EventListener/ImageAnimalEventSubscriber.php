<?php

namespace App\EventListener;

use App\Entity\ImageAnimal;
use Vich\UploaderBundle\Storage\StorageInterface;

class ImageAnimalSubscriber
{
    public function __construct(private StorageInterface $storage)
    {
        
    }

    public function postRemove(ImageAnimal $imageAnimal)
    {
        $path = $this->storage->resolveUri($imageAnimal, 'imageFile');
        if (file_exists($path)) {
            unlink($path);
        }
    }
}