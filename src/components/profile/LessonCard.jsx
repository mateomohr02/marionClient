"use client";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Error from "../Error";

const LessonCard = ({ lesson: lessonProp }) => {

  const t = useTranslations("Lessons")

  const locale = useLocale();
  const lessonRedux = useSelector((state) => state.course.lessonDetail);
  const lesson = lessonProp || lessonRedux;

  const videoPlaceholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAMFBMVEXCy9Lx8/XI0Nfd4ubZ3uP09ve+yM/n6+7V2+Dw8vTQ19zM09nj5+vh5enFztTq7fDNjqdzAAAEKklEQVR4nO3c0a6rIBAFUBQZUBT+/2+vjEjBYm3vQ+sJe730JO1J7M4wRVCFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPhvRMLZlQt/wQvkzDyqaJyNQ14nSAxeqS6jlB8E8npGQnZFUjGvTiKuIzIxqnX4+XlZZj/GKlOdQVolrbZg5slR5KZ5C1DpXx/dnZDdasibcsiRMH4rL4viimjiRMbacKNp5BwnpMW2rNR89v6ikFZiOYzzLk6GP2C/eUx35XiYvWpKxHF27nvHdFfkr7La0/LND0SS6o2GxG1NDa2n5UIK8pHCSR5bpo0PRJrDnCElNHXjSZFRmEHMbZcWF1b6nSOemfbVSELbUv33jux+aFnj0Skc2ibyS20wkl7fWlouLSonULSvNdRaOf8ithxW+JHLZgQpLFVpXWGOoaavHt6t8CgcKmGFlYZj66Kh7XEYfuLypp2FVWldvcp/ONtzaENFWE+tixvct4/wPkLP1i/CKltX+D1s+HQ69PflRVhl6wodTplfHOcthLUX+TKscC6U3h3C+eEvjvMWBlV++1pY2SdCtu2eTIew8nFVDyvVXvNhFd++Ogx9/vGGh+F1z1LZLgbJphv81dQh6+5iW85peOrgDnPyQ1hqLi4M4fl+u+t/x69fnu74w8L8MdrG8MDKulB+Iv285Ro6XMtrpaZsWo+w1PO1M3y2025/F3wmnS077GEpXbmKjVegv3lsd8P7FY+zw7is7GubFocV6BbZYodrC6u+kV9ubTSJ96NTvZBUlWa1vRX2K1rfk+bSSrVE/cklt3xxSOOFFbvW9X5gWFJuet4QhTY1Xk3M+Yq2rxzOvfF+4EVaIauWt8ESGjit+qY9f6DnrNpdycrxFTLnl/7FC/8ksmIxradtVX7PaWRV2IqnU8vTLnS/bO9gDD6QHeNJoeF7BsLNYUTO6HiDCi6DLy3pbhQtB2MGqdP9KKcXfTeL7F5GHNn5GiAEZOfyDroQ2oyoTpCI92aGmPjuTNw+98ra3K0ZVsbivt/3ICYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAONHD24SCt4nj873gHML6wB6WL29eS5X3/SO6sRiW2h4YsPN22lj/k6O6qRQW9VlxPR6lo390XD8klzUAyVUi5Vo4QyqYPSyxP42CvR3WIv8YfdVYlLVu8GQoPGqi76dx/XN8DkusxfVZWGqiP0dehUV+sXJaX0g7rcXcK7dUworPHPogrD94D6W9KK0QVh/C0msoISyr+npYMau3w7K/rpPPvVdZdn1Rys3azW59eQ6LpvQfb/csOfwxy2XPMoKWkXq31pUUYuioTw+5zMKa8WsYKL127nH93r5TPswQHhGkqcOU/4NOVdteWC/sM/i5KM9R78bK/zQL54YfQFgfQFgf+AebTT4TVNZh/gAAAABJRU5ErkJggg==";

  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg==";

  if (!lesson) return <Error msj={t("Page.NoContent")}/>;

  return (
    <div className="px-2 lg:px-8">
      <h1 className="text-center lg:text-left lg:text-4xl font-semibold mb-4 lg:my-6 lg:w-4/5 lg:m-auto">
        {locale === "de" ? lesson?.title?.de : lesson?.title?.es}
      </h1>
      <div className="flex flex-col gap-2 px-2 lg:px-0 lg:gap-4">
        {Array.isArray(lesson?.content?.[locale]) &&
          lesson.content[locale].map((cont, index) => {            

            if (cont.contentType === "text") {
              return (
                <p
                  key={index}
                  className="lg:mt-3 text-base text-justify leading-relaxed font-poppins lg:w-4/5 lg:m-auto"
                >
                  {cont.value}
                </p>
              );
            }

            if (cont.contentType === "image") {
              return (
                <div key={index} className="flex justify-center">
                  <img
                    src={cont.value || placeholder}
                    alt={`Imagen-${index}`}
                    onError={(e) => (e.target.src = placeholder)}
                    className="w-[calc(100vw-0.5rem)] lg:w-4/5 lg:mx-auto object-cover shadow-lg"
                  />
                </div>
              );
            }

            if (cont.contentType === "video") {
              return (
                <div key={index} className="flex justify-center">
                  <div className="w-[calc(100vw-0.5rem)] lg:w-4/5 aspect-video lg:mx-auto">
                    {cont.value ? (
                      <video
                        controls
                        controlsList="nodownload"
                        className="w-full h-full shadow-lg"
                        src={cont.value}
                      >
                        {t("Page.VideoNotSupported")}
                      </video>
                    ) : (
                      <img
                        src={videoPlaceholder}
                        onError={(e) => (e.target.src = placeholder)}
                        className="w-full h-full shadow-lg"
                      />
                    )}
                  </div>
                </div>
              );
            }

            if (cont.contentType === "section") {
              const qImages = parseInt(cont.qImages || "0", 10);
              const isMultipleImages = qImages > 1;
              const textContent = cont.value.find(
                (v) => v.contentType === "text"
              );
              const images = cont.value.filter(
                (v) => v.contentType === "image"
              );
              const video = cont.value.find((v) => v.contentType === "video");

              return (
                <div key={index} className="flex flex-col gap-2 lg:w-4/5 lg:m-auto">
                  {cont.subtitle && (
                    <h2 className="text-3xl mb-2">{cont.subtitle}</h2>
                  )}

                  {isMultipleImages ? (
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-[calc(100vw/8*5)]">
                        {textContent && (
                          <p className="text-base text-justify leading-relaxed font-poppins">
                            {textContent.value}
                          </p>
                        )}
                      </div>
                      <div className="w-[calc(100vw/8*3)] flex flex-col gap-8">
                        {images.map((img, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={img.value || placeholder}
                            alt={`Sección-Imagen-${imgIdx}`}
                            onError={(e) => (e.target.src = placeholder)}
                            className="object-cover shadow-lg"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {textContent && (
                        <p className="text-base leading-relaxed text-left">
                          {textContent.value}
                        </p>
                      )}
                      {images.length === 1 && (
                        <div className="flex justify-center">
                          <img
                            src={images[0].value || placeholder}
                            alt="Sección-Imagen-0"
                            onError={(e) => (e.target.src = placeholder)}
                            className="w-[calc(100vw/8*3)] mx-auto rounded-lg object-cover shadow-lg"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {video && (
                    <div className="flex justify-center">
                      <div className="w-full aspect-video mx-auto my-4">
                        {video.value === "" ? (
                          <img
                            key={index * 15}
                            src={videoPlaceholder}
                            alt={`Sección-Imagen-${index}`}
                            onError={(e) => (e.target.src = placeholder)}
                            className="w-full h-full shadow-lg"
                          />
                        ) : (
                          <video
                            key={index * 10}
                            controls
                            controlsList="nodownload"
                            className="w-full h-full shadow-lg"
                            src={video.value}
                          >
                            {t("Page.VideoNotSupported")}
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
      </div>
    </div>
  );
};

export default LessonCard;
