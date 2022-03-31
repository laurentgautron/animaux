<?php

namespace App\Serializer;

use App\Entity\ImageAnimal;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ImageAnimalDenormalizer implements ContextAwareDenormalizerInterface, DenormalizerInterface
{
    use DenormalizerAwareTrait;

    private const ALREADY_CALLED = "AppImageAnimalDenormalizerAlreadyCalled";

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return !isset($context[self::ALREADY_CALLED]) && $data instanceof ImageAnimal;
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $context[self::ALREADY_CALLED] = true;
        $data->setFeatured(true);
        return $data;
    }
}