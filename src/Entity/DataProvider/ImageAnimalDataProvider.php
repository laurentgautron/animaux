<?php
namespace App\DataProvider;

use App\Entity\ImageAnimal;
use App\Repository\ImageAnimalRepository;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;

class ImageAnimalCollectionProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    public function __construct(private ImageAnimalRepository $imageAnimalRepository)
    {
        
    }

    public function supports(string $resourceClass, ?string $operationName = null, array $context = []): bool
    {
            return $resourceClass === ImageAnimal::class;
    }

    public function getCollection(string $resourceClass, ?string $operationName = null, array $context = [])
    {
        dd($this->imageAnimalRepository->findAll());
        return $this->imageAnimalRepository->findAll();
    }
}