<?php

namespace App\Form;

use App\Form\model\ChangePassword;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class RsetPasswordType extends AbstractType {

    public function buildForm( FormBuilderInterface $builder, array $options) {
        $builder
            ->add('oldpassword', PasswordType::class)
            ->add('plainPassword', RepeatedType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'label' => 'Password',
                'type' => PasswordType::class,
                'invalid_message' => 'les deux mots de passe ne correspondent pas',
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password'],
                'required' => true,
                'first_options' => ['label' => 'Entrez un mot de passe'],
                'second_options' => ['label' => 'Entrez une seconde fois le mot de passe'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}