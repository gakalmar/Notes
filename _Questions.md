# Questions:  

## TW review:
- Terraforming Mars feladat (TW4-rol):
    - Nem ment a wordpress configuracio
    - Full guide https://aws.amazon.com/tutorials/deploy-wordpress-with-amazon-rds/
    - Just the config part: https://aws.amazon.com/tutorials/deploy-wordpress-with-amazon-rds/module-four/

## SI review
- kis elakadasok a het elejen (aws cli verzio, ssh login gondok)

- Terraforming moon 3ik feladat (hogy mashonnan is be lehessen lepni) - ezt at lehetne beszelni mi is tortenik
 
- Kubernetes RBAC feladat:
    - Nginx creation pont (csak pod creating permission van elvileg):
        - meg kell probalni csinalni egy service-t, es elvileg nem kellene sikerulnie, de sikerul, pedig jol lettek beallitva a dolgok. Ez azert van, mert admin role-bol csinalok mindent?
        - hogyan teszteljuk, h tenyleg nem engedi?

- Kubernetes EKS persistency with EBS feladat:
    - elakad a volume csatolas valamiert
    - "Create a deployment" - valamiert leragad "ContainerCreating" stateben (`kubectl get pods`) -> HIBA: "attachdetach-controller  AttachVolume.Attach failed for volume "postgres-pv-2" : timed out waiting for external-attacher of ebs.csi.aws.com CSI driver to attach volume vol-035f524f584d7cc80"
        - try again from scratch
        - try setting gp2 types in the beginning
        - update CSI Driver:
            - `kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=tags/v1.30.0"`
            
# DOCKER-K8S:
- Dockerfile mappak, mire vonatkozik a Copy . . es a workdir?:

    FROM 891376988072.dkr.ecr.eu-west-2.amazonaws.com/test-flask-nginx:1.0
    COPY . /app
    WORKDIR /app
    CMD ["python", "app.py"]

    - A docker networking feladatban eloszor letrehoztam egy image-t (app.py + flask + nginx)
    - Ezutan felpusholtuk AWS-be
    - Majd amikor ujra felhasznaljuk mar direktbe az AWS linkkel, akkor ujra kell neki az app.py file - ezt a reszt hogy kellene csinalni?

- Introduction to docker networking team feladat:
    https://journey.study/v2/learn/courses/252/modules/29404/units/2/TEAM/15518
    hogyan tudom tesztelni a connection-oket? (`MyApp` folderben kell futtatni a `docker-compose up`-ot)

- Rubik's minikube (set up ingress):
    - Amikor letrehozom az ingress-t, akkor a "hello-world.info" megnyitasakor nem hoz be semmit, csak a sima IP addressel mukodik mukodik (a /etc/hosts file-ban is benne van pedig az, hogy `192.168.49.2 hello-world.info`)
    - guide: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

## AWS
- Instance user nevet hol kell beallitani? (ec2-user a default)

## OPEN HOUR TEMA
- script iras
- minta pet projekt - miben mas, mint egy web app?

## OLDER ISSUES:

- TodoDB feladat:
    - a syntaxxal volt gond, foleg a scripten belul (psql feluleten ment)
        - a peldakban levo eredeti `<<EOF` formatummal nem ment
    - masik syntaxot hasznalva mar mukodott, de akkor meg a parametrikus input nem ment

- Scriptekben feljott egy hiba:
    - "-bash: ./widgets.sh: /bin/bash^M: bad interpreter: No such file or directory"
    - ezzel kellett megoldani:
        - `sed -i 's/\r$//' list.sh`

- `sed` es `awk` syntax meg nagyon nem tiszta nekem