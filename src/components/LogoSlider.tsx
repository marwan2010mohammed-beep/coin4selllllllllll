import * as React from "react";

export interface LogoSliderProps {
    logos: React.ReactNode[];
    speed?: number;
    direction?: "left" | "right";
    showBlur?: boolean;
    blurLayers?: number;
    blurIntensity?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export const LogoSlider = ({
    logos,
    speed = 40,
    direction = "left",
    showBlur = true,
    blurLayers = 6,
    blurIntensity = 1,
    className = "",
    pauseOnHover = true,
}: LogoSliderProps) => {
    return (
        <div
            className={`logo-slider w-full overflow-hidden relative ${className}`}
            style={
                {
                    "--speed": speed,
                    "--count": logos.length,
                    "--blurs": blurLayers,
                    "--blur": blurIntensity,
                } as React.CSSProperties
            }
        >
            <style>{`
                .logo-slider__container {
                    display: grid;
                    position: relative;
                    width: 100%;
                    min-height: 90px;
                    overflow: hidden;
                }
                .logo-slider__track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    animation: logo-scroll calc(var(--speed) * 1s) linear infinite;
                }
                .logo-slider__container[data-direction="right"] .logo-slider__track {
                    animation-direction: reverse;
                }
                .logo-slider__container[data-pause-on-hover="true"]:hover .logo-slider__track {
                    animation-play-state: paused;
                }
                .logo-slider__item {
                    width: 150px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    padding: 0 16px;
                }
                @keyframes logo-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% / 2));
                    }
                }
                .logo-slider__blur--left {
                    background: linear-gradient(to right, rgba(5, 7, 13, 0.95), transparent);
                }
                .logo-slider__blur--right {
                    background: linear-gradient(to left, rgba(5, 7, 13, 0.95), transparent);
                }
            `}</style>

            <div
                className="logo-slider__container relative w-full min-h-[90px]"
                data-direction={direction}
                data-pause-on-hover={pauseOnHover}
            >
                {/* Progressive Blur Overlay - Left */}
                {showBlur && (
                    <div className="absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none logo-slider__blur--left" />
                )}

                {/* Progressive Blur Overlay - Right */}
                {showBlur && (
                    <div className="absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none logo-slider__blur--right" />
                )}

                {/* Logo Track (Duplicated for seamless infinite loop) */}
                <div className="logo-slider__track flex items-center h-full m-0 p-0 list-none">
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="logo-slider__item h-20 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="w-full h-full flex items-center justify-center text-slate-300 hover:text-white font-bold tracking-wider text-base sm:text-lg select-none">
                                {logo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

LogoSlider.displayName = "LogoSlider";

export default LogoSlider;
