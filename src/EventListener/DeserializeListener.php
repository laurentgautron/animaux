<?php

namespace App\EventListener;

use ApiPlatform\Core\EventListener\DeserializeListener as DecoratedListener;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class DeserializeListener
{
    public function __construct( private DecoratedListener $decorated)
    {

    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        //dd($request);
        // if ($request->getContentType()=== 'multipart') {
        //     dd('du multipart');
        // } else {
        //     dd('pas multipart');
        // }
    }
}