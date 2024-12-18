import Image from "next/image";

const HowWeHelp = ({ help_you_title, help_you_subtitle, help_you_image, help_you_list }) => {
  return (
    <div className="how_we_help">
      <div className="wrapper">
        {help_you_title && (
          <h2 dangerouslySetInnerHTML={{ __html: help_you_title }}></h2>
        )}
        {help_you_subtitle && (
          <p dangerouslySetInnerHTML={{ __html: help_you_subtitle }}></p>
        )}
        {help_you_image && (
          <Image height={20}
          width={20} src={help_you_image.url} className="help_img" alt={help_you_title} />
        )}
        {help_you_list && (
          <div className="inner">
            {help_you_list.map((item, index) => (
              <div className="col" key={index}>
                <h3>
                  <span>{index + 1}.</span>{item.title}
                </h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HowWeHelp;
