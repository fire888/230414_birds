import {StaticPair} from "@as-com/pson";
import {FileSystem} from "./fileSystem";

export const ExporterScene = {
    export: dataScene => {
        var pson = new StaticPair()
        var data = pson.toArrayBuffer(dataScene)
        // console.log(data)
        FileSystem.writeFileArrayBuffer('scene.nsp', data, null, () => {
            console.log('complete')
        })
    },
    load: callback => {
        FileSystem.chooserFile(chosenFile => {
            console.log('f:', chosenFile)
            var reader = new FileReader();

            const onload = () => {
                var pson = new StaticPair();
                var data = pson.decode(reader.result);
                console.log('dataLoaded', data)
                callback(data)
            }


            //reader.onload = onload;
            reader.onload = callback;
            reader.readAsArrayBuffer(chosenFile[0])
            //reader.readAsArrayBuffer(chosenFile[0]);
            // if ( reader.readAsBinaryString !== undefined ) {
            //     reader.readAsBinaryString(chosenFile[0]);
            // } else {
            //     reader.readAsArrayBuffer(chosenFile[0]);
            // }
            
        })
    },
}





