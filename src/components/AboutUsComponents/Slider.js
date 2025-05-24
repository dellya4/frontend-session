import React, { useState } from 'react';
import Slide from './Slide';
import { useTranslation } from 'react-i18next';

const Slider = () => {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: 'https://t1.unipage.net/src/go4g89.jpeg',
            subtitle: t('slider.subtitle1'),
            title: t('slider.title1'),
            btn1Text: t('slider.login'),
            btn2Text: t('slider.sign')
        },
        {
            image: 'https://static.tildacdn.com/tild3633-3864-4035-a130-653464323636/Frame_7_3.png',
            subtitle: t('slider.subtitle2'),
            title: t('slider.title2'),
            btn1Text: t('slider.login'),
            btn2Text: t('slider.sign')
        },
        {
            image: 'https://u2.9111s.ru/uploads/202304/08/877d176ab025e1221fd5b1304473785f.jpg',
            subtitle: t('slider.subtitle3'),
            title: t('slider.title3'),
            btn1Text: t('slider.login'),
            btn2Text: t('slider.signup')
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section id="div_photo">
            <div className="slider">
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        active={index === currentSlide}
                        image={slide.image}
                        subtitle={slide.subtitle}
                        title={slide.title}
                        btn1Text={slide.btn1Text}
                        btn2Text={slide.btn2Text}
                    />
                ))}
            </div>
            <section className="arrows">
                <button className="arrow-btn" onClick={prevSlide}>&#8592;</button>
                <button className="arrow-btn" onClick={nextSlide}>&#8594;</button>
            </section>
        </section>
    );
};

export default Slider;