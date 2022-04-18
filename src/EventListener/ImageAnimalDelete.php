<?php

namespace App\EventListener;

use App\Entity\ImageAnimal;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Vich\UploaderBundle\Storage\StorageInterface;

class ImageAnimalDelete
{
    public function __construct(private StorageInterface $storage)
    {
        
    }

    public function postRemove(ImageAnimal $imageAnimal, LifecycleEventArgs $args): void
    {
        $path = $this->storage->resolveUri($imageAnimal, 'imageFile');
        if (file_exists($path)) {
            unlink($path);
        }
    }
}