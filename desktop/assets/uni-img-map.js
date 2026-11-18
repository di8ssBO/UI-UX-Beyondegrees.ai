/* uni-img-map.js — trích nguyên văn W + UNI_IMG_MAP từ mobile features/university/detail.
   icon = logo trường (SVG/JPG từ Wikimedia Commons), image = ảnh khuôn viên. null = không có. */
var W = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
var UNI_IMG_MAP = {
  /* Vietnam */
  'fulbright' : { icon: null,  image: null },
  'rmit'      : { icon: W+'RMIT_University_Logo.svg',                                  image: null },
  'fpt'       : { icon: null,  image: null },
  'vnu-hcm'   : { icon: null,  image: null },
  /* Asia */
  'tokyo'     : { icon: W+'University_of_Tokyo_logo_(2024).svg',                       image: W+'Yasuda_Auditorium,_Tokyo_University_-_Apr_14,_2009.jpg' },
  'kaist'     : { icon: W+'KAIST_logo.svg',                                            image: null },
  'tsinghua'  : { icon: W+'Tsinghua_University_Logo.svg',                              image: null },
  'nus'       : { icon: W+'National_University_of_Singapore_logo_print.jpg',           image: W+'NUS,_University_Hall_2,_Nov_06.JPG' },
  'mahidol'   : { icon: W+'Mahidol_U.svg',                                             image: null },
  'iit-bombay': { icon: W+'IIT_Bombay_Logo.svg',                                       image: null },
  'mica'      : { icon: null,                                                           image: null },
  /* Europe */
  'oxford'    : { icon: W+'University_of_Oxford.svg',                                  image: W+'Radcliffe_Camera,_Oxford_-_Oct_2006.jpg' },
  'eth'       : { icon: W+'ETH_Z%C3%BCrich_Logo_black.svg',                            image: null },
  'tum'       : { icon: W+'Logo_of_the_Technical_University_of_Munich.svg',            image: null },
  'sciencespo': { icon: W+'Logo_Sciences_Po.svg',                                      image: null },
  'tudelft'   : { icon: W+'Zegel_Technische_Universiteit_Delft.svg',                   image: null },
  /* USA */
  'mit'       : { icon: W+'MIT_logo.svg',                                              image: W+'MIT_Building_10_and_the_Great_Dome,_Cambridge_MA.jpg' },
  'columbia'  : { icon: W+'Columbia_University_1754.svg',                              image: W+'Columbia_University_-_Low_Memorial_Library-D.JPG' },
  'duke'      : { icon: W+'Duke_University_logo.svg',                                  image: W+'Duke_Chapel_snow.JPG' },
  'ucla'      : { icon: W+'The_University_of_California_UCLA.svg',                     image: W+'UCLA_Campus_on_lawn.JPG' },
  'ucsd'      : { icon: W+'UC_San_Diego_Tritons_wordmark.svg',                         image: null },
  'bu'        : { icon: W+'Boston_University_seal.svg',                                image: null },
  'usc'       : { icon: W+'University_of_Southern_California_logo.svg',                image: null },
  'ufl'       : { icon: W+'University_of_Florida_logo.svg',                            image: null },
  'uci'       : { icon: W+'UC_Irvine_Anteaters_logo.svg',                              image: null },
  'ucf'       : { icon: W+'UCF_Knights_logo.svg',                                      image: null },
  'erau'      : { icon: W+'ERAU.svg',                                                  image: null },
  'fisher'    : { icon: null,                                                           image: null },
  /* Americas */
  'ubc'       : { icon: W+'British_columbia_ca_univ_logo.svg',                         image: null },
  'usp'       : { icon: W+'Universidade_de_S%C3%A3o_Paulo_Logo.svg',                   image: null },
  'unam'      : { icon: W+'Escudo_UNAM.svg',                                           image: null },
  /* Africa */
  'uct'       : { icon: W+'University_of_Cape_Town_logo.svg',                          image: null },
  'cairo-u'   : { icon: W+'Cairo_University_crest.svg',                                image: null },
  'nairobi'   : { icon: null,                                                           image: null },
  'lagos'     : { icon: null,                                                           image: null },
  'mohammedv' : { icon: null,                                                           image: null },
  /* Oceania */
  'anu'       : { icon: W+'Arms_of_the_Australian_National_University.svg',            image: null },
  'melbourne' : { icon: W+'Arms_of_the_University_of_Melbourne.svg',                   image: null },
  'auckland'  : { icon: W+'Coat_of_arms_of_the_University_of_Auckland.svg',            image: null },
};
window.W=W; window.UNI_IMG_MAP=UNI_IMG_MAP;
