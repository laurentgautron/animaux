<?php

namespace App\Serializer;

use App\Entity\ImageAnimal;
use Vich\UploaderBundle\Storage\StorageInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;

class ImageAnimalNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'AppImageAnimalNormalizerAlreadyCalled';

    public function __construct(private StorageInterface $storage)
    {
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {   
        return !isset($context[self::ALREADY_CALLED]) && $data instanceof ImageAnimal;
    }
    
    public function normalize(mixed $object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
    {
        //dd('bonjour normalizer');
        $object->setImageUrl($this->storage->resolveUri($object, 'imageFile'));
        $context[self::ALREADY_CALLED] = true;
        return $this->normalizer->normalize($object, $format, $context);
    }

}
