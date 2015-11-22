<?php
// Load XML file
$xml = new DOMDocument;
$xml->load('gov-data.xml');

// Load XSL file
$xsl = new DOMDocument;
$xsl->load('transform.xsl');

// Configure the transformer
$proc = new XSLTProcessor;

// Attach the xsl rules
$proc->importStyleSheet($xsl);

echo $proc->transformToXML($xml);
