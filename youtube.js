import { Innertube } from 'youtubei.js';

const yt = await Innertube.create({ clientType: 'WEB', cookie: 'GPS=1; YSC=H3-64P_o2LU; VISITOR_INFO1_LIVE=4a-WI4NAP1s; VISITOR_PRIVACY_METADATA=CgJQSxIEGgAgaQ%3D%3D; PREF=f6=40000000&tz=Asia.Karachi; __Secure-ROLLOUT_TOKEN=CKGvnuSy07XpXxC_3cmAsKiPAxiC3p2GsKiPAw%3D%3D; __Secure-1PSIDTS=sidts-CjQB5H03P6h1lm9z9ZV2I8xFTmuKWc4EkLb9IxyeZwubGOtvRJAQSWMKXSlRhO_KAiu4bBeqEAA; __Secure-3PSIDTS=sidts-CjQB5H03P6h1lm9z9ZV2I8xFTmuKWc4EkLb9IxyeZwubGOtvRJAQSWMKXSlRhO_KAiu4bBeqEAA; HSID=A0MmGjNcMBkoAKBqG; SSID=A8cEvx2wQgx8TnsHy; APISID=6lNn0BQFjdW_5p9X/AzkxdlFWLImNIEH1x; SAPISID=468vas8V3FDndm3d/AInuJnkfHydYZvvPN; __Secure-1PAPISID=468vas8V3FDndm3d/AInuJnkfHydYZvvPN; __Secure-3PAPISID=468vas8V3FDndm3d/AInuJnkfHydYZvvPN; SID=g.a0000gjA34f1P1qrOat2sBkKUisbjCS7ncz5vTP3ieUHHsAy5L-uI_67YRxMDB9zOx_GbbVvVQACgYKAZISARMSFQHGX2MifIzn-6McPMjma2gySkAwPhoVAUF8yKpNfLKWvQjNG2-kSrj1ExoQ0076; __Secure-1PSID=g.a0000gjA34f1P1qrOat2sBkKUisbjCS7ncz5vTP3ieUHHsAy5L-urJQm4OYj5ky8n9vkc9R7hgACgYKAZESARMSFQHGX2MiCqNSVh3JWGdppK9-FCrZGBoVAUF8yKqPMl5a4burOLsno9uqwTyw0076; __Secure-3PSID=g.a0000gjA34f1P1qrOat2sBkKUisbjCS7ncz5vTP3ieUHHsAy5L-uoHghuJpQhzaaGI1yH-D2nAACgYKAVgSARMSFQHGX2Mi6qqBJIvXjXfpmTEGGz0rLRoVAUF8yKoHlP3XOZhooWIQiyascPqB0076; LOGIN_INFO=AFmmF2swRgIhAIDQ1rJZJVfDbOeFlM4-FcJ5Q9CEfA02taBSACtpJofFAiEA9jASKbnMOZQEXxQlz497e0P6z-LIkTlVkFZ-z_ZCtKc:QUQ3MjNmeTlhcGVET3dCbXN2Rmxwa0E3U3pMRzdZbHNTNkt3VGozZGg2Y1E4R1BHSDVUcW5Nc29oTThyTk4yWjFXOW9EeFFNb2tmSWdkT1BPdFNDWEV1MnN5djFoMkdIZEdxNjhOQ2QwNzYtZ0ZJdDJlTEdCM3hGZUkzWEphaXlsNXI1VGZfcjlqeXhaZElMeXNEZG05b3BGaEZyVDQ0ajdn; ST-l3hjtt=session_logininfo=AFmmF2swRgIhAIDQ1rJZJVfDbOeFlM4-FcJ5Q9CEfA02taBSACtpJofFAiEA9jASKbnMOZQEXxQlz497e0P6z-LIkTlVkFZ-z_ZCtKc%3AQUQ3MjNmeTlhcGVET3dCbXN2Rmxwa0E3U3pMRzdZbHNTNkt3VGozZGg2Y1E4R1BHSDVUcW5Nc29oTThyTk4yWjFXOW9EeFFNb2tmSWdkT1BPdFNDWEV1MnN5djFoMkdIZEdxNjhOQ2QwNzYtZ0ZJdDJlTEdCM3hGZUkzWEphaXlsNXI1VGZfcjlqeXhaZElMeXNEZG05b3BGaEZyVDQ0ajdn; SIDCC=AKEyXzXVmo1LZKjUtj_BfAhyhjN8A20Q6FXdO2-TRrOLeKKFVQ_d8k-2uJAdE-TBC0SP_PwB; __Secure-1PSIDCC=AKEyXzVbK0hUkSmfTHFa8385OSsB5KyAFgOmxXi-RKuZyOKbqe84eQLo-7XiD5xR2OtkMTSi; __Secure-3PSIDCC=AKEyXzXLEYTHG7l04EvqpdII-tlyBrKdv1doAFQaV3MtsiB93XzQ2Q3JYwnb-K1A6Hjxqau-' });
async function getTranscript(videoId) {
  // Step 1: Get video info
  const info = await yt.getInfo(videoId);

  // Step 2: Extract available captions
  const captions = info.captions?.caption_tracks;
  if (!captions || !captions.length) {
    throw new Error('No captions available for this video');
  }

  // Pick the first track (English auto-generated, etc.)
  const track = captions[0];

  // Step 3: Request transcript with the required params
  const response = await yt.call(track)
  console.log(response)
}

// Example run
const transcript = await getTranscript('zOLPxkcd_X0');
fs.writeFileSync('transcript.json', JSON.stringify(transcript, null, 2), 'utf8');
console.log('✅ Transcript saved to transcript.json');