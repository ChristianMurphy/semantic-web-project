<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
    xmlns:owl="http://www.w3.org/2002/07/owl#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    >
    <xsl:template match="/">
        <xsl:for-each select="Food_Display_Table/Food_Display_Row">
            <owl:NamedIndividual>
                <xsl:attribute name="rdf:about">http://www.semanticweb.org/team-1/yummy-app#<xsl:value-of select="Display_Name" />Dish</xsl:attribute>
                <rdf:type rdf:resource="http://www.semanticweb.org/team-1/yummy-app#dish"/>
                <hasNutrient>
                    <xsl:attribute name="rdf:resource">http://www.semanticweb.org/team-1/yummy-app#<xsl:value-of select="Display_Name" />Nutrient</xsl:attribute>
                </hasNutrient>
            </owl:NamedIndividual>
            <owl:NamedIndividual>
                <xsl:attribute name="rdf:about">http://www.semanticweb.org/team-1/yummy-app#<xsl:value-of select="Display_Name" />Nutrient</xsl:attribute>
                <rdf:type rdf:resource="http://www.semanticweb.org/team-1/yummy-app#nutrient"/>
                <saturatedFat rdf:datatype="decimal">
                    <xsl:value-of select="Saturated_Fats" />
                </saturatedFat>
                <calories rdf:datatype="decimal">
                    <xsl:value-of select="Calories" />
                </calories>
            </owl:NamedIndividual>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
