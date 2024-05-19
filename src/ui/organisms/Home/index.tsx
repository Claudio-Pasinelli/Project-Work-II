import { useEffect } from 'react';
import { removeLoggedCookies, removeNameCookies } from '../../../utils';
import { LOGGED } from '../../../utils/costants/auth';
import Cookies from 'js-cookie';

const Home = () => {
  useEffect(() => {
    Cookies.get(LOGGED) !== 'logged' ? (removeLoggedCookies(), removeNameCookies()) : null;
  }, []);

  return (
    <div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam consequuntur eligendi ad,
        fugiat perferendis alias iste. Cumque aliquam a perferendis natus mollitia, nihil architecto
        laudantium, obcaecati facilis sint fugit facere. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Vero eligendi suscipit minima officiis aut a possimus, praesentium
        nostrum, accusantium sit quasi beatae incidunt sequi et veritatis reiciendis mollitia
        corrupti! Quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quod
        necessitatibus inventore fuga aspernatur deleniti veritatis facere dolores, impedit corrupti
        voluptatum minus nulla laudantium labore illum molestias repellat, ut architecto! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ipsa facilis maxime in, magni, veritatis
        dicta nobis eos repellat ea rem velit magnam quod repellendus soluta, incidunt eaque?
        Consequuntur, reprehenderit maxime! Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Porro harum voluptate ex, quisquam quod architecto natus quidem, dolore deserunt iste
        quis ea. Dolore molestiae veritatis tempora? Quod optio eius eum! Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Saepe molestias adipisci doloribus, veritatis hic
        corrupti totam! Ipsa iste aperiam, voluptates in dicta nulla assumenda! Omnis sapiente cum
        totam iure provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        sequi ipsum fuga temporibus odit possimus voluptates veritatis suscipit animi, accusantium
        itaque excepturi cumque culpa consequuntur ad dolore quidem, tenetur minima. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Suscipit non iure, officia modi minus, deleniti
        ut dolores hic vel nesciunt adipisci sed placeat dicta eum qui dignissimos eius molestiae.
        Asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam
        suscipit velit porro obcaecati soluta, quis, reprehenderit sequi ea quos earum. Ut veniam
        similique asperiores laudantium, vero quisquam quidem eveniet! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro repellendus eum iure vitae consectetur maiores neque
        totam praesentium beatae rerum, labore exercitationem provident nobis temporibus omnis,
        saepe facilis esse ducimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
        adipisci quaerat magni accusantium, nobis iusto ad aspernatur tempora illo nulla provident
        aperiam voluptas suscipit deleniti, temporibus maxime odit optio molestias. Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Voluptatibus incidunt esse ratione. Ad
        molestias qui tempora adipisci consequatur magni in magnam voluptatum provident. Nihil quis,
        velit atque reiciendis perferendis hic. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Corporis dolor adipisci minus suscipit soluta, deleniti molestiae provident sed
        consequuntur accusantium non ad consequatur quo excepturi sequi laudantium quos asperiores
        deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatum
        soluta ea, ad nobis laborum natus neque vel dicta earum debitis, magni ullam nisi, iusto
        consectetur totam alias vero sint. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Possimus in at tenetur eius odit exercitationem ex saepe reiciendis aliquid adipisci, iste
        accusantium iure nisi inventore deleniti? Veritatis recusandae voluptates asperiores? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Deleniti tenetur facilis ad provident
        ipsum animi explicabo corrupti aliquid sit! Iste, molestiae sit. Quaerat accusantium aliquam
        ducimus sint asperiores, soluta sequi? Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Necessitatibus atque pariatur, tenetur nemo omnis ratione provident sed dicta magnam
        maiores dignissimos quos. Tempore asperiores reiciendis fugit dolorem! Asperiores, et quod!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore amet dolorem, voluptas,
        ullam aliquid quidem dolor reiciendis nam deleniti sequi sint cupiditate, similique
        consequuntur illo placeat alias recusandae labore adipisci? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Molestias repellat optio iste sed dolorem amet reprehenderit
        voluptatibus fugit est, voluptatem aliquid nesciunt, incidunt, non similique eius. Nobis
        odio in soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores asperiores
        aliquid illum hic, praesentium modi cumque tempora pariatur vero soluta eum eaque. Quas
        laboriosam quod amet tempora sequi? Asperiores, beatae. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Tenetur pariatur aperiam commodi repudiandae, nemo obcaecati
        ea exercitationem illum iure cum dolor et? Labore aperiam porro aut animi at beatae quasi.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem aliquid, totam aspernatur
        voluptates porro veniam tempora magnam ad, repellendus enim non accusamus a deleniti fugit
        eum pariatur? Ut, rem accusamus?
      </div>
    </div>
  );
};

export default Home;
