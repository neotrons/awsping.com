var awsRegions = [
    {
        "region": {
            "code": "us-east-1",
            "name": "US-East (Virginia)"
        },
        "endpoint": "https://dynamodb.us-east-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "us-east-2",
            "name": "US East (Ohio)"
        },
        "endpoint": "https://dynamodb.us-east-2.amazonaws.com/"
    },
    {
        "region": {
            "code": "us-west-1",
            "name": "US-West (California)"
        },
        "endpoint": "https://dynamodb.us-west-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "us-west-2",
            "name": "US-West (Oregon)"
        },
        "endpoint": "https://dynamodb.us-west-2.amazonaws.com/"
    },
    {
        "region": {
            "code": "ca-central-1",
            "name": "Canada (Central)"
        },
        "endpoint": "https://dynamodb.ca-central-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "eu-west-1",
            "name": "Europe (Ireland)"
        },
        "endpoint": "https://dynamodb.eu-west-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "eu-west-2",
            "name": "Europe (London)"
        },
        "endpoint": "https://dynamodb.eu-west-2.amazonaws.com/"
    },
    {
        "region": {
            "code": "eu-central-1",
            "name": "Europe (Frankfurt)"
        },
        "endpoint": "https://dynamodb.eu-central-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "eu-west-3",
            "name": "Europe (Paris)"
        },
        "endpoint": "https://dynamodb.eu-west-3.amazonaws.com/"
    },
    {
        "region": {
            "code": "eu-north-1",
            "name": "Europe (Stockholm)"
        },
        "endpoint": "https://dynamodb.eu-north-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "me-south-1",
            "name": "Middle East (Bahrain)"
        },
        "endpoint": "https://dynamodb.me-south-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-east-1",
            "name": "Asia Pacific (Hong Kong)"
        },
        "endpoint": "https://dynamodb.ap-east-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-south-1",
            "name": "Asia Pacific (Mumbai)"
        },
        "endpoint": "https://dynamodb.ap-south-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-northeast-3",
            "name": "Asia Pacific (Osaka-Local)"
        },
        "endpoint": "https://dynamodb.ap-northeast-3.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-northeast-2",
            "name": "Asia Pacific (Seoul)"
        },
        "endpoint": "https://dynamodb.ap-northeast-2.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-southeast-1",
            "name": "Asia Pacific (Singapore)"
        },
        "endpoint": "https://dynamodb.ap-southeast-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-southeast-2",
            "name": "Asia Pacific (Sydney)"
        },
        "endpoint": "https://dynamodb.ap-southeast-2.amazonaws.com/"
    },
    {
        "region": {
            "code": "ap-northeast-1",
            "name": "Asia Pacific (Tokyo)"
        },
        "endpoint": "https://dynamodb.ap-northeast-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "sa-east-1",
            "name": "South America (São Paulo)"
        },
        "endpoint": "https://dynamodb.sa-east-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "cn-north-1",
            "name": "China (Beijing)"
        },
        "endpoint": "https://dynamodb.cn-north-1.amazonaws.com.cn/"
    },
    {
        "region": {
            "code": "cn-northwest-1",
            "name": "China (Ningxia)"
        },
        "endpoint": "https://dynamodb.cn-northwest-1.amazonaws.com.cn/"
    },
    {
        "region": {
            "code": "us-gov-east-1",
            "name": "AWS GovCloud (US-East)"
        },
        "endpoint": "https://dynamodb.us-gov-east-1.amazonaws.com/"
    },
    {
        "region": {
            "code": "us-gov-west-1",
            "name": "AWS GovCloud (US)"
        },
        "endpoint": "https://dynamodb.us-gov-west-1.amazonaws.com/"
    }
];

var createTable = () => {
    var tableRef = document.getElementById('awsRegions').getElementsByTagName('tbody')[0];
    awsRegions.forEach(function (region) {
        var newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.id = region.region.code;
        newRow.insertCell(0).appendChild(document.createTextNode(region.region.code));
        newRow.insertCell(1).appendChild(document.createTextNode(region.region.name));
        newRow.insertCell(2).innerHTML = "";
    });
}

var ping = (pixel, regions, index = 0) => {
    if (Object.keys(regions).length > index) {
        var region = regions[index];
        var img = document.createElement("img");
        var latCell = document.getElementById(region.region.code).getElementsByTagName('td')[2];
        latCell.innerHTML = '<b>ping...</b>';
        img.onerror = () => {
            var endTime = (new Date()).getTime();
            var elapsed = endTime - startTime;
            latCell.innerHTML = `${elapsed.toString()} ms`;
            index++;
            ping(pixel, regions, index);
        }
        pixel.innerHTML = "";
        pixel.appendChild(img);
        var startTime = (new Date()).getTime();
        img.src = region.endpoint;
    }
}

var startPing = () => {
    var pixel = document.getElementById("pixelPing");
    ping(pixel, awsRegions);
}