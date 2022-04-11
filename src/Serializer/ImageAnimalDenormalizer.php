<?php

namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;

class ImageAnimalDenormalizer implements ContextAwareDenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    private const ALREADY_CALLED_DENORMALIZER = "ApppImageAnimalDenormalizerCalled";

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        $allreadyCalled = $context[self::ALREADY_CALLED_DENORMALIZER] ?? false;
        return $allreadyCalled === false;
    }
    
    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $context[self::ALREADY_CALLED_DENORMALIZER] = true;
        dd('bonjour denormalizer');
    }
}